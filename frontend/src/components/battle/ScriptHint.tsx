import { Card, CardContent, CardHeader } from '../ui/card';

export default function ScriptHint({ message }: { message: string }) {
  return (
    //   <div className="mt-4 bg-primary-border text-primary-border-fg p-2 rounded">
    //     <strong>Script Recommendation:</strong> {message}
    //   </div>
    <Card className="mt-4 p-1 gap-0 bg-background max-w-md">
      <CardHeader className=" text-primary-border">Script Recommendation</CardHeader>
      <CardContent className='text-lg font-medium text-wrap'>{message}</CardContent>
    </Card>
  );
}
