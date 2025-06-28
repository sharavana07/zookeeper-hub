// src/pages/UsersPage.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const userList = snap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (uid, newRole) => {
    try {
      await updateDoc(doc(db, "users", uid), { role: newRole });
      setUsers(users.map(u => 
        u.id === uid ? { ...u, role: newRole } : u
      ));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDelete = async (uid) => {
    // Prevent users from deleting themselves
    if (uid === currentUser?.uid) {
      alert("You cannot delete your own account!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", uid));
        setUsers(users.filter(u => u.id !== uid));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-white">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">👥 Manage Users</h1>
      
      <div className="space-y-4">
        {users.map(userItem => (
          <div key={userItem.id} className="bg-zinc-800 p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg">📧 {userItem.email}</p>
                <p className="text-sm text-gray-300">🔐 Role: {userItem.role}</p>
                {userItem.id === currentUser?.uid && (
                  <span className="text-xs text-blue-400">(You)</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={userItem.role || "researcher"}
                  onChange={(e) => handleRoleChange(userItem.id, e.target.value)}
                  className="text-black p-2 rounded border"
                  disabled={userItem.id === currentUser?.uid}
                >
                  <option value="admin">Admin</option>
                  <option value="zookeeper">Zookeeper</option>
                  <option value="vet">Vet</option>
                  <option value="researcher">Researcher</option>
                </select>
                
                <button
                  onClick={() => handleDelete(userItem.id)}
                  disabled={userItem.id === currentUser?.uid}
                  className={`px-3 py-2 text-white rounded transition-colors ${
                    userItem.id === currentUser?.uid
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}