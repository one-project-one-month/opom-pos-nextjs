'use client';

import React, { ChangeEvent, useState } from 'react';
import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';

type MemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: { name: string; email: string; phone: string }) => void;
};

const MemberModal = ({ isOpen, onClose, onSave }: MemberModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', email: '', phone: '' });
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className="min-h-auto">
      <div className="flex flex-col justify-between mt-6">
        <h1 className="text-2xl font-bold text-center mb-10">
          Create Member Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Member Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#F5F5F5] p-3 rounded-lg focus:ring-2 focus:ring-[#FB9E3A] focus:border-transparent transition-colors"
                placeholder="Enter member name"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#F5F5F5] p-3 rounded-lg focus:ring-2 focus:ring-[#FB9E3A] focus:border-transparent transition-colors"
                placeholder="member@example.com"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#F5F5F5] p-3 rounded-lg focus:ring-2 focus:ring-[#FB9E3A] focus:border-transparent transition-colors"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <CustomBtn
            type="submit"
            className="flex-1 mt-6 bg-[#FB9E3A] hover:bg-[#E28E34] text-white rounded-lg w-full py-4 font-medium transition-colors"
          >
            Save
          </CustomBtn>
        </form>
      </div>
    </Modal>
  );
};

export default MemberModal;
