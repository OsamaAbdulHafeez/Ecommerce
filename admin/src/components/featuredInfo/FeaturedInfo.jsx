import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {

  const [income, setIncome] = useState([])
  const [perc, setPerc] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get('/order/income')
        setIncome(res.data.data)
        setPerc((res.data.data[1].total * 100) / res.data.data[0].total - 100)
      } catch (error) {

      }
    }
    getIncome()
  }, [])
  console.log()
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs{income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.round(perc)}{" "} {perc < 0 ? <ArrowDownward className="featuredIcon negative" /> :
              <ArrowUpward className="featuredIcon" />
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
