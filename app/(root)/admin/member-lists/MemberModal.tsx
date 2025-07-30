'use client';

import React, { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';
import Axios from '@/app/api-config';
import { API } from '@/app/constants/api';
import toast from 'react-hot-toast';

type MemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MemberModal = ({ isOpen, onClose }: MemberModalProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const createCustomer = async (customerData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      const response = await Axios.post(API.customers, customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer created successfully!');
      onClose();
      setFormData({ name: '', email: '', phone: '' });
    },
    onError: (error) => {
      toast.error('Failed to create customer. Please try again.');
      console.error('Mutation error:', error);
    },
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
    if (!formData.name || !formData.phone) {
      toast.error('Name and phone number are required');
      return;
    }
    mutation.mutate(formData);
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
            className="flex-1 mt-6 bg-[#FB9E3A] hover:bg-[#E28E34] text-white rounded-lg w-full py-4 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Save'}
          </CustomBtn>
        </form>
      </div>
    </Modal>
  );
};

export default MemberModal;
