import { useEffect, useState } from 'react';
import socket from './socket';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    user: 'Vitalidad'
  });

  useEffect(() => {
    socket.on('updateList', (data) => setProducts(data));
    return () => socket.off('updateList');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.quantity) return;
    const product = {
      ...form,
      date: new Date().toLocaleDateString('en-GB')
    };
    socket.emit('addProduct', product);
    setForm({ ...form, name: '', quantity: '' });
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping List</h1>

      {/* Add product form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Add product</h2>
        <div className="flex gap-4 mb-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="border rounded p-2 w-full"
          />
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to list
        </button>
      </div>

      {/* Product table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.quantity}</td>
              <td className="p-2">{p.user}</td>
              <td className="p-2">{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;