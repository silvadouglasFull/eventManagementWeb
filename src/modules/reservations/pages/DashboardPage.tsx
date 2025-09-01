// src/modules/reservations/pages/DashboardPage.tsx
import { type ReservationDTO } from '@modules/reservations/dtos/ReservationDTO';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateReservationModal from '../components/CreateReservationModal';
import { reservationsService } from '../services';

const DashboardPage: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const fetchReservations = async () => {
        try {
            const data = await reservationsService.getReservations();
            setReservations(data);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchReservations();
    }, []);
    const handleCreateSuccess = () => {
        fetchReservations(); // Atualiza a lista após a criação de uma reserva
    };
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-4">Scheduled Meetings</h1>
                <Button variant="success" onClick={() => setShowModal(true)}>
                    + Create Reservation
                </Button>
            </div>
            {reservations.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Room ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Guests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.room_id}</td>
                                <td>{new Date(reservation.start_date).toLocaleString()}</td>
                                <td>{new Date(reservation.end_date).toLocaleString()}</td>
                                <td>{reservation.guests.map(guest => (
                                    <div key={guest.id}>
                                        {guest.email} ({guest.status})
                                    </div>
                                ))}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No scheduled meetings found.</Alert>
            )}
            <CreateReservationModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSuccess={handleCreateSuccess}
            />
        </Container>
    );
};

export default DashboardPage;