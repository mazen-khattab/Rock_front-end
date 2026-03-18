import React, { createContext, useCallback, useContext, useState } from "react";
import type { ApiResponse } from "../Types/auth";
import type { ContactInfo } from "../Types/contact";
import { contactUsService } from "../Services/ContactUsService";

type ContactUsContextValue = {
  loading: boolean;
  contactUs: (contactInfo: ContactInfo) => Promise<ApiResponse<string>>;
};

const ContactUsContext = createContext<ContactUsContextValue>({
  loading: false,
  contactUs: async () => ({ isSucess: false, message: "", data: "" }),
});

export function ContactUsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const contactUs = useCallback(
    async (contactInfo: ContactInfo): Promise<ApiResponse<string>> => {
      try {
        setLoading(true);
        
        const response = await contactUsService.contactUs(contactInfo);
        
        return response;
      } catch (error: any) {
        console.log(error);

        throw error;
        // return { success: false, message: "An error occurred", data: "" };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <ContactUsContext.Provider value={{ loading, contactUs }}>
      {children}
    </ContactUsContext.Provider>
  );
}

export const useContactUs = () => useContext(ContactUsContext);
