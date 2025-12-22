import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSessionStorage } from '@/app/utils/useSessionStorage'; //getting user profile from local storage
import Image from 'next/image'
import { useRouter } from 'next/navigation'

//user dashboard menu component
export default function Menu() {
  // const apiRoute = process.env.API_ROUTE
  const pathname = usePathname()
  const router = useRouter()
  const userImg = useSessionStorage()?.userImage

  //logout function and removing local storage
  const Logout = () => {
    localStorage.removeItem("webloginData")
    router.push('/')
    // console.log(userId)
  }
  const desiredPath = pathname.split('/').pop();
  //console.log(desiredPath)
  // console.log(typeof(desiredPath))

  useEffect(() => {
    const localdata = localStorage.getItem('webloginData');
    if(localdata == "undefined"){
        router.push('/login')
    }
    else{
        const loginCredentials = JSON.parse( localStorage.getItem('webloginData'));
        const userID = loginCredentials?.userId;
    if (userID) {
      // Redirect to a dashboard page, for example, the dashboard
     // router.push('/Dashboard');
    }
    else{router.push('/login')}
    }

  }, [router]);


  return (
    <>
      <div className='col-md-3'>
        <div className='dashboard_left_menu'>
          <div className='dashboard_left_menu_list'>
            <div className='dashboard_left_menu_list_item'>
              <Link href="/dashboard" className={desiredPath == 'Dashboard' ? 'active' : ''}><Image src="/images/profile-icon.png" alt="profile" width={20} height={20} /> <span>Profile</span></Link>
            </div>
            <div className='dashboard_left_menu_list_item'>
              <Link href="/dashboard/impact-tracker" className={desiredPath == 'ImpactTracker' ? 'active' : ''}><Image src="/images/impact-icon.png" alt="profile" width={20} height={20} /> <span>Impact Tracker</span></Link>
            </div>
            <div className='dashboard_left_menu_list_item'>
              <Link href="/dashboard/my-forest" className={desiredPath == 'MyForest' ? 'active' : ''}><Image src="/images/forest-icon.png" alt="profile" width={20} height={20} /> <span>My Forest</span></Link>
            </div>
            <div className='dashboard_left_menu_list_item'>
              <Link href="/dashboard/pedometer" className={desiredPath == 'Pedometer' ? 'active' : ''}><Image src="/images/pedometer-icon.png" alt="profile" width={20} height={20} /> <span>Pedometer</span></Link>
            </div>
            <div className='dashboard_left_menu_list_item'>
              <Link href="/dashboard/eco-tracker" className={desiredPath == 'EcoTracker' ? 'active' : ''}><Image src="/images/eco-coin-icon.png" alt="profile" width={20} height={20} /> <span>Eco-coin Tracker</span></Link>
            </div>
            <div className='dashboard_left_menu_list_item'>
              <Link href="/dashboard/orders" className={desiredPath == 'Orders' ? 'active' : ''}><Image src="/images/orders-icon.png" alt="profile" width={20} height={20} /> <span>Orders</span></Link>
            </div>
            <div className='dashboard_left_menu_list_item'>
              <li onClick={Logout} style={{ cursor: 'pointer', listStyle: 'none', padding: '15px' }}><Image src="/images/logout-icon.png" alt="profile" width={20} height={20} /> <span> Logout</span></li>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}