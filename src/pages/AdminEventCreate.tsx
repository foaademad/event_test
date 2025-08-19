import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import EventForm from '../components/admin/EventForm';
import Card, { CardHeader, CardBody } from '../components/common/Card';
import { useEvents } from '../hooks/useEvents';

const AdminEventCreate: React.FC = () => {
  const { createEvent, isLoading, error } = useEvents();
  const navigate = useNavigate();
  
  const handleSubmit = (eventData: any) => {
    createEvent(eventData).then(() => {
      navigate('/admin/events');
    });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          </CardHeader>
          <CardBody>
            <EventForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminEventCreate;