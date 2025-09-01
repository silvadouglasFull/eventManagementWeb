// src/modules/reservations/components/CreateReservationModal.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { type RoomDTO } from '@modules/roms/dtos';
import { romsService } from '@modules/roms/services';
import type { UserDTO } from '@modules/users/dtos';
import { usersService } from '@modules/users/services';
import React, { useEffect, useState, type ChangeEvent } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createReservationSchema, type CreateReservationFormData } from '../schemas/createReservationSchema';
import { reservationsService } from '../services';

interface CreateReservationModalProps {
    show: boolean;
    onHide: () => void;
    onSuccess: () => void;
}

const CreateReservationModal: React.FC<CreateReservationModalProps> = ({ show, onHide, onSuccess }) => {
    const [rooms, setRooms] = useState<RoomDTO[]>([]);
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<UserDTO[]>([])
    const [selected, setSelected] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Add reset to the destructuring
    } = useForm<CreateReservationFormData>({
        resolver: zodResolver(createReservationSchema),
    });
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = event.target.options;
        const values = [];

        for (let i = 0, len = selectedOptions.length; i < len; i++) {
            if (selectedOptions[i].selected) {
                values.push(selectedOptions[i].value);
            }
        }

        setSelected(values);
    };
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const fetchedRooms = await romsService.getRooms();
                setRooms(fetchedRooms.data);
            } catch (err) {
                if (err instanceof Error) setError(err.message)
                else setError('An unexpected error occurred while fetching rooms.')
            } finally {
                setIsLoadingRooms(false);
            }
        };

        if (show) {
            fetchRooms();
        }
    }, [show]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await usersService.getUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                if (err instanceof Error) setError(err.message)
                else setError('An unexpected error occurred while fetching users.')
            }
            setIsLoadingRooms(false);
        }
        if (show) {
            fetchUsers()
        }
    }, [show])
    const onSubmit = async (data: CreateReservationFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await reservationsService.createReservation({
                room_id: data.room_id,
                start_date: data.start_date,
                end_date: data.end_date,
                guests: selected,
            });
            onSuccess();
            onHide();
            reset();
        } catch (err) {
            if (err instanceof Error) setError(err.message)
            else setError('An unexpected error occurred while fetching reservation.')
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create a New Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Room</Form.Label>
                        {isLoadingRooms ? (
                            <div className="text-center"><Spinner animation="border" /></div>
                        ) : (
                            <Form.Select
                                {...register('room_id')}
                                isInvalid={!!errors.room_id}
                            >
                                <option value="">Select a room</option>
                                {rooms.length && rooms?.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.name}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                        <Form.Control.Feedback type="invalid">
                            {errors.room_id?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            {...register('start_date')}
                            isInvalid={!!errors.start_date}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.start_date?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            {...register('end_date')}
                            isInvalid={!!errors.end_date}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.end_date?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Guest Emails (comma-separated)</Form.Label>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Open this select menu</option>
                            {users.length && users?.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.email}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting || isLoadingRooms}
                >
                    {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateReservationModal;