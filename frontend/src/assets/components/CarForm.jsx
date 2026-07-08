import { Form, Input, Button } from 'antd';

export default function CarForm({ initialValues, onSubmit, submitLabel }) {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    await onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      className="glass-panel car-form"
      requiredMark={false}
    >
      <div className="form-grid">
        <Form.Item
          className="form-grid-full"
          label="ทะเบียนรถ"
          name="registration_number"
          rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถ' }]}
        >
          <Input placeholder="กข 1234 กรุงเทพมหานคร" />
        </Form.Item>

        <Form.Item
          label="ยี่ห้อ"
          name="brand"
          rules={[{ required: true, message: 'กรุณากรอกยี่ห้อ' }]}
        >
          <Input placeholder="Toyota" />
        </Form.Item>

        <Form.Item
          label="รุ่น"
          name="model"
          rules={[{ required: true, message: 'กรุณากรอกรุ่น' }]}
        >
          <Input placeholder="Fortuner" />
        </Form.Item>

        <Form.Item className="form-grid-full" label="หมายเหตุ" name="notes">
          <Input.TextArea rows={3} placeholder="รายละเอียดเพิ่มเติมของรถคันนี้" />
        </Form.Item>
      </div>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={<i className="fa-solid fa-floppy-disk" aria-hidden="true" style={{ marginRight: 6 }} />}
        >
          {submitLabel}
        </Button>
      </Form.Item>
    </Form>
  );
}