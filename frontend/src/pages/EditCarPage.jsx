import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import CarForm from '../assets/components/CarForm';
import { getCar, updateCar } from '../services/carApi';

export default function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    getCar(id)
      .then((res) => setInitialValues(res.data))
      .catch(() => {
        message.error('ไม่พบข้อมูลรถ');
        navigate('/');
      });
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateCar(id, values);
      message.success('บันทึกการแก้ไขแล้ว');
      navigate('/');
    } catch (err) {
      message.error('บันทึกไม่สำเร็จ');
    }
  };

  if (!initialValues) {
    return (
      <div className="page-container empty-state">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>แก้ไขข้อมูลรถ</h1>
          <p>ปรับปรุงรายละเอียดของ {initialValues.brand} {initialValues.model}</p>
        </div>
      </div>
      <CarForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="บันทึกการแก้ไข"
      />
    </div>
  );
}