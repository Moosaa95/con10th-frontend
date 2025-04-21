import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  data?: any[]; // You can refine the type here
  children?: React.ReactNode;
className?: string; 
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  data,
  children,
  className,
}) => {
  const hasData = data && data.length > 0;

  return (
    <Card className={cn("border-none px-5 gap-5 rounded-[8px]", className)}>
      <CardHeader>
        <CardTitle className={`text-lg font-bold text-primary-700`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? children : <EmptyState />}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
