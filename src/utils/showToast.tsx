import toast from "react-hot-toast";

export const showToastTxn = (message: string, txHash: string) => {
  const etherscanUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
  toast.custom((t) =>
      (
        <div
          style={{
            backgroundColor: '#fff'
          }}
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full shadow-lg rounded-lg cursor-pointer pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          onClick={() => {
            window.open(etherscanUrl, '_blank');
          }}
        >
          <div className="w-full flex p-4 gap-2">
            <div className={'text-black font-medium text-base'}>
              {message}. Click to view on Etherscan
            </div>
          </div>
        </div>
      ),
    {
      duration: 6000,
      position: 'top-right',
      style: {
        background: 'transparent',
        backdropFilter: 'blur(4px)',
        color: '#000',
      },
    }
  )
}