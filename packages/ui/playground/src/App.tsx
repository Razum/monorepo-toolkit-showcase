import { Badge, Button, Card } from '../../src';

export function App() {
  return (
    <div style={{ display: 'grid', gap: 16, padding: 24, maxWidth: 720 }}>
      <Card
        title="@repo/ui playground"
        footer={
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge tone="success">Ready</Badge>
            <Badge role="admin">Admin</Badge>
            <Badge role="member">Member</Badge>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button size="lg" variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </Card>
    </div>
  );
}
