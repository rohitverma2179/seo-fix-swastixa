"use client";

import dynamic from 'next/dynamic';
import React from "react";
const AwardList = dynamic(() => import('../components/awards/AwardList'));

export default function Awards() {
  return (
    <main>
      <AwardList />
    </main>
  );
}
