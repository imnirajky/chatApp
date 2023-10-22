import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {
  return (
    <div className="flex w-full h-4/5 box-border my-4 p-10">
      <div className="border-gray-400 border-[1px] w-1/6 rounded-lg shadow-xl shadow-slate-400 mr-20 flex flex-col">
        <div className="h-10 flex text-lg font-medium justify-center rounded-lg items-center border-b-2 border-400-gray bg-cyan-800 text-white">Chats</div>
        <div className="h-16 flex text-lg rounded-lg font-medium justify-right items-center border-b-2 border-400-gray p-4">
        <Avatar sx={{ background:"gray" }}>N</Avatar>
        <div className='mx-4'>Niraj</div>
        </div>
       
      </div>
      <div className="border-gray-400 border-[1px] w-5/6 rounded-lg shadow-xl shadow-slate-400">
      <div className="h-16 flex text-lg font-medium justify-right items-center border-b-2 border-400-gray p-4 rounded-lg bg-cyan-800 text-white">
        <Avatar sx={{ background:"orange" }}>N</Avatar>
        <div className='mx-4'>Niraj</div>
        </div>
        <div className='bg-gray-200 w-full h-5/6 p-3'>
            
        <div className="w-fit h-12 rounded-md font-semibold flex justify-right items-center bg-lime-500 p-4">
        <Avatar sx={{ background:"gray" }}>N</Avatar>
        <div className='mx-3 w-fit h-fit  text-white text-justify'>Niraj</div>
        </div>

        </div>
        <div className='bg-gray-700 w-full h-16 flex p-4 justify-center items-center rounded-lg'>
            <input className='w-4/6 h-10 border-2 rounded-md mx-4 p-2' type="text" />
            <Button variant="contained" endIcon={<SendIcon />}>
            Send
            </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage;
