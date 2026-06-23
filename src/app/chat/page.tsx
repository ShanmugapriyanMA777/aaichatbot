'use client';

import Sidebar from '@/components/chat/Sidebar';
import ChatArea from '@/components/chat/ChatArea';
import { AuroraBackground } from '@/components/ui/glass';

export default function ChatPage() {
  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#050505]">
      <AuroraBackground />
      <Sidebar />
      <ChatArea />
    </main>
  );
}