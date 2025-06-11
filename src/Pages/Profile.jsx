import { useState, useEffect } from "react";
import {logout} from "./Auth";
import { UserRound } from "lucide-react";
import {currentuser} from '../Pages/Auth';

export default function ProfilePage() {
  const [userName, setUserName] = useState("Pravin");

  const handlelogin = async() => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await currentuser();
        if (user) {
          setUserName(user.name || "User");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
          <div className="relative border-2 border-gray-300 rounded-full p-2">
          <UserRound size="50"/>
          </div>
          <h2 className="text-xl font-semibold">{userName}</h2>
          <button onClick={handlelogin} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
          <div className="w-full p-4 border rounded-lg text-center">
            <p className="font-medium">Address</p>
            <p className="text-sm text-gray-500">123 Magic Street, Dreamland</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 space-y-6">
          {/* Saved Items */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Saved Items</h3>
            <div className="grid grid-cols-2 gap-3">
          
                <div  className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Perfume</p>
                </div>
              
            </div>
          </div>

          {/* Orders Placed */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Orders Placed</h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((order) => (
                <div key={order} className="h-24 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
