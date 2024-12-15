import { Bitcoin, Blocks } from "lucide-react";
import { TimeCard } from "@/components/TimeCard";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useQuery } from "@tanstack/react-query";

interface BlockchainTimeSectionProps {
  time: Date;
}

const fetchBlockHeight = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export function BlockchainTimeSection({ time }: BlockchainTimeSectionProps) {
  const { data: bitcoinData } = useQuery({
    queryKey: ['bitcoin-height'],
    queryFn: () => fetchBlockHeight('https://blockchain.info/q/getblockcount'),
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: ethereumData } = useQuery({
    queryKey: ['ethereum-height'],
    queryFn: () => fetchBlockHeight('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKey'),
    refetchInterval: 60000,
  });

  const { data: dogeData } = useQuery({
    queryKey: ['doge-height'],
    queryFn: () => fetchBlockHeight('https://dogechain.info/api/v1/block/count'),
    refetchInterval: 60000,
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <TimeCard title="Blockchain Time" icon={<Blocks className="w-5 h-5" />}>
            <div className="space-y-3 text-center">
              <div>
                <div className="text-sm text-muted-foreground">Bitcoin Block Height</div>
                <div className="font-space text-lg text-orange-400">
                  {bitcoinData ?? 'Loading...'}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Ethereum Block Height</div>
                <div className="font-space text-lg text-purple-400">
                  {ethereumData ? parseInt(ethereumData.toString(), 16) : 'Loading...'}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Dogecoin Block Height</div>
                <div className="font-space text-lg text-yellow-400">
                  {dogeData ?? 'Loading...'}
                </div>
              </div>
            </div>
          </TimeCard>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Blockchain Time</h4>
          <p className="text-sm text-muted-foreground">
            Displays current block heights for major blockchain networks, representing 
            the progression of time in distributed ledger systems.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}