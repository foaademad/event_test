import React from 'react';
import Layout from '../components/layout/Layout';
import { Calendar, Users, Gift, Star, Shield, HeartHandshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServicesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const services = [
    {
      icon: Calendar,
      title: 'Event Planning',
      titleAr: 'تخطيط الفعاليات',
      description: 'Professional event planning services for any occasion',
      descriptionAr: 'خدمات احترافية لتخطيط الفعاليات لجميع المناسبات'
    },
    {
      icon: Users,
      title: 'Attendee Management',
      titleAr: 'إدارة الحضور',
      description: 'Comprehensive tools for managing event attendees',
      descriptionAr: 'أدوات شاملة لإدارة حضور الفعاليات'
    },
    {
      icon: Gift,
      title: 'Ticket Management',
      titleAr: 'إدارة التذاكر',
      description: 'Easy ticket creation and management system',
      descriptionAr: 'نظام سهل لإنشاء وإدارة التذاكر'
    },
    {
      icon: Star,
      title: 'Premium Features',
      titleAr: 'ميزات متميزة',
      description: 'Access to premium features for event organizers',
      descriptionAr: 'الوصول إلى ميزات متميزة لمنظمي الفعاليات'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      titleAr: 'منصة آمنة',
      description: 'Advanced security measures for your events',
      descriptionAr: 'إجراءات أمنية متقدمة لفعالياتك'
    },
    {
      icon: HeartHandshake,
      title: '24/7 Support',
      titleAr: 'دعم متواصل',
      description: 'Round-the-clock support for organizers and attendees',
      descriptionAr: 'دعم متواصل على مدار الساعة للمنظمين والحضور'
    }
  ];

  return (
    <Layout>
      <div className="bg-rose-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isRTL ? 'خدماتنا' : 'Our Services'}
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              {isRTL 
                ? 'نقدم مجموعة شاملة من الخدمات لجعل فعاليتك ناجحة'
                : 'We offer a comprehensive suite of services to make your event successful'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <service.icon className="h-12 w-12 text-rose-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {isRTL ? service.titleAr : service.title}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? service.descriptionAr : service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;