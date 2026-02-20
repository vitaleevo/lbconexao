import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useContacts = () => {
    const createContact = useMutation(api.contacts.create);
    return { createContact };
};
