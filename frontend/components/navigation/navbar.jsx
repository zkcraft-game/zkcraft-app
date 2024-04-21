import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="https://zkcraft.vercel.app/" target={"_blank"}>
				<img
					className={styles.alchemy_logo}
					src="/zkCraft.svg"
				></img>
			</a>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
