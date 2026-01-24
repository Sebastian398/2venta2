'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

export default function NuevoProductoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'electronica',
    description: '',
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Máximo 5 imágenes permitidas.');
      return;
    }

    // Simulamos "subida" generando URLs de preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || imagePreviews.length === 0) {
      alert('Por favor completa todos los campos obligatorios e incluye al menos una imagen.');
      return;
    }

    // Simulación de guardado
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('✅ Producto creado exitosamente');
      router.push('/');
    }, 800);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </span>
            Venta
          </Link>
          <h1 className="ml-6 text-lg font-semibold text-gray-700">Crear nuevo producto</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              placeholder="Ej: Auriculares Bluetooth"
            />
          </div>

          {/* Precios */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Precio ($)<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Precio original ($)</label>
              <input
                type="number"
                step="0.01"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              />
            </div>
          </div>

          {/* Categoría */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
            >
              <option value="electronica">Electrónica</option>
              <option value="moda">Moda</option>
              <option value="hogar">Hogar</option>
              <option value="juguetes">Juguetes</option>
              <option value="deportes">Deportes</option>
              <option value="belleza">Belleza</option>
            </select>
          </div>

          {/* Imágenes */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Imágenes del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-orange-400 hover:text-orange-500 transition"
            >
              {imagePreviews.length > 0 ? 'Cambiar imágenes' : 'Seleccionar imágenes (máx. 5)'}
            </button>

            {/* Previsualización */}
            {imagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative h-20 rounded overflow-hidden border">
                    <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              placeholder="Detalles del producto..."
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`flex-1 py-3 rounded-lg font-bold transition ${
                isUploading
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isUploading ? 'Guardando...' : 'Publicar producto'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}