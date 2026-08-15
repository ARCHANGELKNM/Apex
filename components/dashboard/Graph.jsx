import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";


export default function Graph () {
       const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
   
      
        useEffect(() => {
          load();
        }, []);
      
        async function load() {
          setLoading(true);
          setError(null);
          try {
            const res = await fetch("/api/tasks/summary");
            if (!res.ok) throw new Error("Failed to load summary");
            const json = await res.json();
            setData(json);
          } catch (err) {
            console.error(err);
            setError("Unable to load progress");
          } finally {
            setLoading(false);
          }
        }
  
        


        if (loading)
          return (
            <Card variant="brutal" className="p-6 border-4 border-black bg-white">
              <div className="text-sm font-black uppercase">Loading progress...</div>
            </Card>
          );
      
        if (error || !data)
          return (
            <Card variant="brutal" className="p-6 border-4 border-black bg-white">
              <div className="text-sm font-black uppercase text-red-600">{error || "No data"}</div>
            </Card>
          );

                       const { total = 0, completed = 0, overdue = 0 } = data;
             const percent = total ? Math.round((completed / total) * 100) : 0;
             const radius = 48;
             const stroke = 10;
             const normalizedRadius = radius - stroke * 0.5;
             const circumference = normalizedRadius * 2 * Math.PI;
             const strokeDashoffset =
               circumference - (percent / 100) * circumference;
      
    return(
      <div className={"flex"}>
           <Card variant="brutal" className="p-6 border-4 border-black bg-white">
        <svg height={radius * 2} width={radius * 2} className="shrink-0  flex flex-centre">
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#16a34a"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-black" style={{ fontSize: 14 }}>
            {percent}%
          </text>
        </svg>
          </Card>
    </div>
    );
}