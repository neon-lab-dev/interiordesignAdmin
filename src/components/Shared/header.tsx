import { useEffect, useState } from 'react';
import { ICONS } from '../../assets';

const Header = () => {
    const [user, setUser] = useState(""); // Initially empty

    useEffect(() => {
        // Replace this with your actual API call
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/getUser'); // Example endpoint
                const data = await response.json();
                setUser(data.name); // Set user name from the response
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUser(); // Call the function to fetch user data
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div className="flex justify-between mb-4 py-4 bg-primary-20">
            <div className="p-1 px-5 bg-primary-30 w-[338px] h-[38px] flex gap-2 ml-[78px] items-center rounded-full">
                <img src={ICONS.search} alt="Search Icon" className="w-[16px] h-[15px]" />
                <input
                    type="search"
                    placeholder="Search"
                    className="border-0 md:block outline-0 bg-transparent placeholder:text-text-accent10 placeholder:text-[14px] placeholder:font-normal"
                />
            </div>
            <div className="flex w-36 mx-7">
                <div>
                    <img src={ICONS.avatar} alt="avatar" className="w-11 h-11 mr-4 bg-white rounded-full" />
                </div>
                <div className="flex flex-col gap-[6px]">
                    <p className="text-[14px] leading-[17px] font-bold text-text-accent">Kabir{user}</p>
                    <p className="text-[12px] leading-[14px] font-bold text-text-muted">Admin</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
