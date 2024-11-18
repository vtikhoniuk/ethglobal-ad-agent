import { useWriteContract, useReadContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { RequestMgmtAbi } from '../../contracts/RequestMgmtAbi';
import { useEffect, useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

const ContractAddress = import.meta.env.CONTRACT_ADDRESS;

function Request() {
    const { isConnected, address } = useAccount()
    const { data: hash, writeContract, isPending } = useWriteContract()
    /* const result = useReadContract({
        abi: RequestMgmtAbi,
        address: ContractAddress,
        functionName: 'getResponse',
    }) */
    const [ error, setError ] = useState<string | null>(null);
    const [ isResponsePhase, setResponsePhase ] = useState(false);
    const [text, setText] = useState('')

    const nonce = Math.floor(Math.random() * 2**64)

    /* useEffect(() => {
        // Загрузка начального состояния из контракта
        const loadContractData = async () => {
        try {
            const result = await refetch();
            if (result.data) {
            setInitialValue(result.data);
            }
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
        }
        };
    
        loadContractData();
    }, []); */

    const SendRequest = async () => {
        try {
            if (!isConnected || !address) throw new Error('User Disconnected');
            writeContract({
                address: ContractAddress,
                abi: RequestMgmtAbi,
                functionName: 'submitRequest',
                args: [text, BigInt(nonce)],
            })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Request error:', error);
            setError(error.message);
        }
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      SendRequest()
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-5">
            Введите текст
          </label>
          <Textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите ваш текст здесь..."
            rows={5}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isPending}>{isPending ? 'Confirming...' : 'Request'}</Button>
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Request confirmed</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </form>
    )

    /* return (
        <div>
            <form>
                <label>
                    Enter description of your campaign:
                </label>
                <input type="textarea" name="input" 
                    rows="10"
                    cols="60"
                ></input>
                <button onClick={SendRequest} disabled={isPending}>
                    {isPending ? 'Confirming...' : 'Request'}
                </button>
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Request confirmed</div>}
                {error && <div style={{ color: 'red' }}>Error: {error}</div>}
            </form>
        </div>

    ); */
};

export default Request;
