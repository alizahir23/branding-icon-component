import Image from 'next/image'
import styles from './styles.module.css'
import GlobalBrandingIcon from '../../public/components/global_branding_icon/global_branding_icon'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className='main'>

      <GlobalBrandingIcon />
    </main>
  )
}
