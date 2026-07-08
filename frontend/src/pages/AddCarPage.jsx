import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import CarForm from '../assets/components/CarForm';
import { createCar } from '../services/carApi';

export default function AddCarPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await createCar(values);
      message.success('เพิ่มข้อมูลรถแล้ว');
      navigate('/');
    } catch (err) {
      message.error('เพิ่มข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>เพิ่มข้อมูลรถ</h1>
          <p>กรอกรายละเอียดรถคันใหม่ให้ครบถ้วน</p>
        </div>
      </div>
      <CarForm onSubmit={handleSubmit} submitLabel="บันทึกข้อมูลรถ" />
    </div>
  );
}