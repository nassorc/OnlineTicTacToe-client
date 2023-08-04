import PageShell from "@/components/PageShell";
import { useParams } from "react-router-dom"
import { PieChart, Pie, Cell} from 'recharts';

const data2 = [
  { name: 'Wins', value: 560},
  { name: 'Loses', value: 440}
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default function UserPage() {
  const { username } = useParams();
  return (
    <PageShell className="flex flex-col items-start">
      <div className="flex space-x-4">
        <div className="w-[120px] h-[120px] aspect-square bg-[slateblue] rounded-sm"></div>
        <div className="space-y-2">
          <h1 className="text-3xl">{username}</h1>
          <p className="text-lg">email</p>
        </div>
      </div>

      {/* <section className="flex justify-center items-center space-x-4">
        <div>
          <p>Rating: 400</p>
          <p>Wins: 50</p>
          <p>Loses: 50</p>
        </div>
        <PieChart className="w-[200px] h-[200px]" width={200} height={200} >
          <Pie
            className="top-1/2 left-1/2"
            data={data2}
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart> 
      </section> */}
    </PageShell>
  )
}
