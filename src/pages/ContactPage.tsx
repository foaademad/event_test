import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Layout>
      <div className="bg-emerald-50 min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">Contact Us</h1>
            <h2 className="text-2xl text-emerald-600 mb-8">اتصل بنا</h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name / الاسم
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email / البريد الإلكتروني
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message / الرسالة
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>

              <div className="flex justify-center">
                <Button type="submit">
                  Send Message / إرسال الرسالة
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-4">Contact Information</h3>
                <p className="text-gray-600">Email: info@eventhub.com</p>
                <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600">Address: 123 Event Street, City</p>
              </div>
              <div dir="rtl">
                <h3 className="text-xl font-semibold text-emerald-700 mb-4">معلومات الاتصال</h3>
                <p className="text-gray-600">البريد الإلكتروني: info@eventhub.com</p>
                <p className="text-gray-600">الهاتف: +1 (555) 123-4567</p>
                <p className="text-gray-600">العنوان: 123 شارع الفعاليات، المدينة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;