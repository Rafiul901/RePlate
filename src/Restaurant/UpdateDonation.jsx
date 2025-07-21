import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';
import Swal from 'sweetalert2';

const UpdateDonation = () => {
  const donation = useLoaderData(); // Loaded donation data from loader
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: donation?.title || '',
    foodType: donation?.foodType || '',
    quantity: donation?.quantity || '',
    pickupWindow: donation?.pickupWindow || '',
    location: donation?.location || '',
    image: donation?.image || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let imageUrl = donation.image;

      // If a new image was uploaded
      if (formData.image && typeof formData.image !== 'string') {
        const imgData = new FormData();
        imgData.append('image', formData.image);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: 'POST',
          body: imgData
        });
        const imgResult = await res.json();
        imageUrl = imgResult.data.url;
      }

      const updatedData = {
        title: formData.title,
        foodType: formData.foodType,
        quantity: formData.quantity,
        pickupWindow: formData.pickupWindow,
        location: formData.location,
        image: imageUrl
      };

      const response = await fetch(`http://localhost:3000/pending-donations/${donation._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();

      if (result.modifiedCount > 0) {
        Swal.fire('Updated', 'Donation updated successfully!', 'success');
      } else {
        Swal.fire('No Change', 'No fields were changed.', 'info');
      }

    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update donation.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl border-2 border-green-500">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Update Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Donation Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="foodType" placeholder="Food Type" value={formData.foodType} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="pickupWindow" placeholder="Pickup Time Window" value={formData.pickupWindow} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input input-bordered w-full" required />

        <input value={user?.displayName || ''} className="input input-bordered w-full bg-gray-100" readOnly />
        <input value={user?.email || ''} className="input input-bordered w-full bg-gray-100" readOnly />

        <input type="file" name="image" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
      

        <button type="submit" disabled={loading} className="btn btn-success w-full">
          {loading ? 'Updating...' : 'Update Donation'}
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
