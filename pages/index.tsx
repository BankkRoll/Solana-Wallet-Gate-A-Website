import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram, useClaimNFT } from "@thirdweb-dev/react/solana";
import { useState } from "react";
import swal from 'sweetalert';
import Head from 'next/head'

import * as whitelist from '../whitelist';
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
let isAllowed=false;
export default function NFTDrop() {
  const wallet = useWallet();
  let found = whitelist.findIndex(whitelist => whitelist == wallet.publicKey?.toBase58());
  if (found != -1) {
    isAllowed = true;
  }
  const { program, isLoading } = useProgram("54eLZv1NcSzRzBTJJ3JFkiREKRK6v9hvrttNQi9CmEG","nft-drop");
  const claim = useClaimNFT(program);

  return (
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            src="/3.png"
            height={200}
            width={200}
            objectFit="contain"
            alt="BR Labs"
          />
        </div>
        <h1 className={styles.h1}>Solana, meet Bankkroll 👋</h1>
        <div className={styles.explain}> Need a solana mint DApp? Contact me here → <a href="https://twitter.com/bankkroll_eth">
              Bankkroll</a> </div>
              <div className={styles.explain}> Wanna check out more of my services and projects? → <a href="https://bankkroll.xyz">
              bankkroll.xyz</a> </div>
        <p className={styles.explain}>
          This page is where will create your simple mint dapp to you liking.
        </p>
        

        {wallet.connected && isAllowed ? (
          <button className="btn btn-5" onClick={() =>
              claim.mutate(
                { amount: 1 },
                {
                    onSuccess: (Success) => {
                      console.log(Success);
                      swal('Mint Successful','You minted 1 NFT!','success');
                    },
                  onError: (error) => {
                    console.error(error);
                    swal("Oops!", "Something went wrong!", "error");
                  },
                }
              )
            }
          >
            {claim.isLoading
              ? "Claiming....."
              : claim.isSuccess
              ? "Success Minting!"
              : "Mint NFT 0.8 SOL"}
          </button>
        ) : (
          // <WalletMultiButton />
          null
        )}
        
        <div className={styles.container}>
        
        <div className="nbtn">
        <p>
          THIS IS A DEVNET TEST SITE!
        </p>
        <div className="nbtn2"></div>
        </div>
        </div>

        <div className="Home_iconContainer1">
          <Image
            src="/sol.png"
            height={40}
            width={40}
            objectFit="contain"
            alt="SOLANA"
          />
        </div>
      <div> 
          <h5 className="footer">
            Developed with ❤️‍🔥 by: <a href="https://twitter.com/bankkroll_eth">
              Bankkroll</a>
              &nbsp;-&nbsp;<a href="https://bankkroll.xyz">
              BR Labs</a>
          </h5>
        </div>
    </div>
  );
}
