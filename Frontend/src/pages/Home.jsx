const appUrl = import.meta.env.VITE_APP_URL;
import {useState, useEffect, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {AuthContext} from '../context/AuthContext'
const Home = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [listings, setListings] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const update = ()=>{
    }
    useEffect(()=>{
      update();
      setLoading(true); 
      
      const fetchData = async () => {
        
        let data = await fetch(`${appUrl}/listing`,{
          method : 'GET',
          credentials: 'include',
        });
        let res = await data.json();
        console.log("I am here");
        if(res.user){
          setIsLoggedIn(res.user);
        }
        setListings(res.allListings);
        console.log("here ", res.user);
        setLoading(false);
        console.log("What you say!!")
        console.log(res.allListings);
        
      };
      fetchData();
    }, []);
    if(isLoggedIn){
      console.log(isLoggedIn)  
    }

  return ( 
  <>
  <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  


  <div className="">


  <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 drop-shadow-md">
            Explore Unique Listings
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find places that match your vibe 🌍✨
          </p>
        </div>
    

    {/* Displaying Listings */}
    {loading && (
  <div className="flex  justify-center h-screen">
    <p className="text-lg font-semibold">Loading...</p>
  </div>
)}
      {!loading && listings? (
        <div className="flex flex-wrap justify-center gap-6">
          {listings.map((listing) => (
            <NavLink to={`/show/${listing._id}`}>
              <Card key={listing._id} className="w-full sm:w-[80%] md:w-[45%] lg:w-[22%]" data={listing} />
            </NavLink>
          ))}
        </div>
      ) :<></> }
        {!loading && !listings && <p className="text-gray-500 text-center mt-10 text-lg">No listings found.</p>}
      

      
    </div>
    <Footer />
    </>
  )
}

export default Home
