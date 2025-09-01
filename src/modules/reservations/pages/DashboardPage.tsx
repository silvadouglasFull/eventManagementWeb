// src/modules/reservations/pages/DashboardPage.tsx
import { type ReservationDTO } from '@modules/reservations/dtos/ReservationDTO';
import React, { useEffect, useState } from 'react';
import { Alert, Container, Spinner, Table } from 'react-bootstrap';
import { reservationsService } from '../services';

const DashboardPage: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        fetchReservations();
    }, []);

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
            <h1 className="mb-4">Scheduled Meetings</h1>
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
        </Container>
    );
};

export default DashboardPage;