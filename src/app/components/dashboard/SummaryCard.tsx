import { Tooltip } from "@mui/material";

interface SummaryCardProps {
  icon: any;
  title: string;
  value: string | number;
  tooltip: string;
}

export const SummaryCard = ({ icon: Icon, title, value, tooltip }: SummaryCardProps) => (
  <div className="mb-5 w-full rounded-md px-4 py-4 shadow-lg drop-shadow-xl">
    <div className="flex pt-1">
      <Icon sx={{ fontSize: 32 }} className="mt-0.5" />
      <Tooltip title={tooltip}>
        <p className="ml-auto text-3xl text-slate-900 font-bold">{value}</p>
      </Tooltip>
    </div>
    <h2 className="mt-8 text-xl">{title}</h2>
  </div>
); 