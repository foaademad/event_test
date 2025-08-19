import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useTranslation } from 'react-i18next';

const CongratulationsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { eventTitle } = location.state || { eventTitle: t('congratulations.defaultEvent') };

  return (
    <Layout>
      <div className="min-h-screen bg-sky-50 dark:bg-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-sky-500 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('congratulations.title')}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('congratulations.message', { eventTitle })}
            </p>
            
            <div className="space-y-4">
              <Link to="/my-events">
                <Button fullWidth>
                  {t('congratulations.viewBookings')}
                </Button>
              </Link>
              
              <Link to="/events">
                <Button variant="outline" fullWidth>
                  {t('congratulations.exploreMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CongratulationsPage;