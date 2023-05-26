import ManualHeader from "../../components/ManualHeader";
import Header from "../../components/Header";
import LotteryEntrance from "../../components/LotteryEntrance";

export default function Home() {
  return (
      <div>
          <title>Smart contract lottery</title>
          <meta name="description" content='Our smart contract lottery' />
          <link rel='icon' href='/favicon.ico'/>
        <Header/>
        <LotteryEntrance/>
      </div>
  )
}
