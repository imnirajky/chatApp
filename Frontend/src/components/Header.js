import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const Header = () => {
    return (
    <div className="h-20 bg-gradient-to-r bg-gray-700 flex justify-center">
    <h1 className="font-mono text-2xl flex justify-center items-center font-bold text-white mt-4">
        <ChatBubbleIcon></ChatBubbleIcon>
        Chat Webapp
    </h1>
    </div>
    );
}

export default Header;