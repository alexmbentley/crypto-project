import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';

const CoinData = () => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    try {
      setLoading(true);
      const data = await getDocs(collection(db, `watchlist/${user.uid}/coin`));
      setWatchlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [user]);

  return { watchlist, loading };
};

export default CoinData;
