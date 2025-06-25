"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import { prisma } from "@repo/db/client";

export async function getP2PTxns() {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const id = session?.user?.id;
    let collectingContacts = [];

    if (id) {
      
      const userAllContacts = await prisma.contacts.findMany({
          where: {
            userId: id,
          },
          include: {
            contact: true     // pura contact hi utha lo 
          }
      })
      const numberOfContacts = userAllContacts.length;
      if(userAllContacts)
      {
        collectingContacts = userAllContacts.map((c) => ({
          contactId: c.contactId,
          contactName: c.contact.name,
          contactEmail: c.contact.email,
          contactNumber: c.contact.number
        }));
      }
      
        return {
          userAllContacts, numberOfContacts
        }
    }
    return { 
        error: "Unauthorized"
    }
  } catch (e) {
    console.error("Error Occurred in Contact Fetching", e);
    return { 
        error: "Internal Server Error" 
    };
  }
}
