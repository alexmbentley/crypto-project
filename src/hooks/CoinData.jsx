import { collection, getDocs } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';

const CoinData = () => {
  const { user } = UserAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    try {
      setLoading(true);
      const data = await getDocs(
        collection(db, `watchlist/${user.email}/coin`)
      );
      setWatchlist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const memoizedGetList = useCallback(getList, [user]);

  useEffect(() => {
    memoizedGetList();
  }, [memoizedGetList]);

  return { watchlist, loading, getList };
};

export default CoinData;
