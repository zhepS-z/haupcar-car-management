import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Typography } from 'antd';
import { getCars, deleteCar } from '../services/carApi';

const { Text } = Typography;

export default function CarListPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCars = async () => {
    setLoading(true);
    try {
      const res = await getCars();
      setCars(res.data);
    } catch (err) {
      message.error('โหลดข้อมูลรถไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      message.success('ลบข้อมูลรถแล้ว');
      loadCars();
    } catch (err) {
      message.error('ลบข้อมูลไม่สำเร็จ');
    }
  };

  const columns = [
    {
      title: 'ทะเบียนรถ',
      dataIndex: 'registration_number',
      key: 'registration_number',
      render: (text) => <Text strong>{text}</Text>,
    },
    { title: 'ยี่ห้อ', dataIndex: 'brand', key: 'brand' },
    { title: 'รุ่น', dataIndex: 'model', key: 'model' },
    {
      title: 'หมายเหตุ',
      dataIndex: 'notes',
      key: 'notes',
      render: (text) => <Text type="secondary">{text || '-'}</Text>,
    },
    {
      title: '',
      key: 'actions',
      width: 110,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Link to={`/edit/${record.id}`}>
            <Button
              shape="circle"
              className="glass-icon-btn"
              icon={<i className="fa-solid fa-pen" aria-hidden="true" />}
              aria-label="แก้ไข"
            />
          </Link>
          <Popconfirm
            title="ยืนยันการลบ"
            description={`ต้องการลบ ${record.brand} ${record.model} ใช่หรือไม่`}
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              shape="circle"
              danger
              className="glass-icon-btn"
              icon={<i className="fa-solid fa-trash" aria-hidden="true" />}
              aria-label="ลบ"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>รายการรถทั้งหมด</h1>
          <p>ข้อมูลรถของบริษัท {cars.length} คัน</p>
        </div>
        <Link to="/add">
          <Button
            type="primary"
            icon={<i className="fa-solid fa-circle-plus" aria-hidden="true" style={{ marginRight: 6 }} />}
          >
            เพิ่มรถ
          </Button>
        </Link>
      </div>

      <div className="glass-panel table-panel">
        <Table
          columns={columns}
          dataSource={cars}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8 }}
          locale={{ emptyText: 'ยังไม่มีข้อมูลรถ เริ่มเพิ่มรถคันแรกได้เลย' }}
        />
      </div>
    </div>
  );
}