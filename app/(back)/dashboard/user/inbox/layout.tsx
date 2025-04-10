import { getDoctorAppointments } from "@/actions/appointments";
import { getInboxMessages, getInboxSentMessages } from "@/actions/inbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MailListPanel from "@/components/Dashboard/Doctor/MailListPannel";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar, Mail } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "USER") {
    return <NotAuthorized />;
  }
  const messages = (await getInboxMessages(user?.id)).data || [];
  const sentMessages = (await getInboxSentMessages(user?.id)).data || [];
  return (
    <div>
      {/* Header */}

      {/* 2 PANNELS */}
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-4  py-3 border-r border-gray-100">
          <PanelHeader
            title="Inbox Messages"
            count={messages.length ?? 0}
            icon={Mail}
          />
          <div className="px-3">
            <Tabs defaultValue="received" className="">
              <TabsList>
                <TabsTrigger value="received">
                  Received({messages.length.toString().padStart(2, "0")})
                </TabsTrigger>
                <TabsTrigger value="sent">
                  Sent({sentMessages.length.toString().padStart(2, "0")})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received">
                <MailListPanel messages={messages} role={user?.role} />
              </TabsContent>
              <TabsContent value="sent">
                <MailListPanel messages={sentMessages} role={user?.role} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
