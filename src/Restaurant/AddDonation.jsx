import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import Swal from 'sweetalert2';

const AddDonation = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    foodType: '',
    quantity: '',
    pickupWindow: '',
    location: '',
    image: null
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

    if (!formData.image) {
      return Swal.fire('Image Required', 'Please upload an image.', 'warning');
    }

    try {
      setLoading(true);
      // Upload image to ImgBB
      const imgData = new FormData();
      imgData.append('image', formData.image);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
        method: 'POST',
        body: imgData
      });
      const imgResult = await res.json();
      const imageUrl = imgResult.data.url;

      // Prepare data to send to backend
      const donationData = {
        title: formData.title,
        foodType: formData.foodType,
        quantity: formData.quantity,
        pickupWindow: formData.pickupWindow,
        location: formData.location,
        restaurantName: user.displayName,
        restaurantEmail: user.email,
        image: imageUrl,
        status: 'Pending',
        createdAt: new Date()
      };

      // Send to backend
      const backendRes = await fetch('http://localhost:3000/pending-donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData)
      });

      const result = await backendRes.json();

      if (result.insertedId) {
        Swal.fire('Success', 'Donation added successfully!', 'success');
        setFormData({
          title: '',
          foodType: '',
          quantity: '',
          pickupWindow: '',
          location: '',
          image: null
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to add donation.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl border-2 border-blue-500">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Add Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Donation Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="foodType" placeholder="Food Type (e.g., bakery, produce)" value={formData.foodType} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="quantity" placeholder="Quantity (e.g., 5kg or 10 portions)" value={formData.quantity} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="pickupWindow" placeholder="Pickup Time Window (e.g., 3pm - 6pm)" value={formData.pickupWindow} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="location" placeholder="Location / Address" value={formData.location} onChange={handleChange} className="input input-bordered w-full" required />

        {/* Read-only user info */}
        <input value={user?.displayName || ''} className="input input-bordered w-full bg-gray-100" readOnly />
        <input value={user?.email || ''} className="input input-bordered w-full bg-gray-100" readOnly />

        <input type="file" name="image" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" required />

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Adding...' : 'Add Donation'}
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
