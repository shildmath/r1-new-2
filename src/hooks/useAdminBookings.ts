
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdminBooking {
  id: string;
  slot_id: string;
  slot_date: string;
  slot_time: string;
  slot_time_zone: string;
  is_available: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  call_status: string;
  deal_status: string;
  closed_date?: string;
  follow_up_call_date?: string;
  reschedule_date?: string;
  payment_link_sent?: string;
  contract_link_sent?: string;
  invoice_sent?: string;
  invoice_sent_date?: string;
  contract_sent?: string;
  contract_sent_date?: string;
  offer_made?: string;
  ad_spend?: string;
  country_area?: string;
  zip_code?: string;
  recording_link?: string;
  note?: string;
  additional_info?: string;
  created_at: string;
  closer_id: string;
  closer_name: string;
  closer_email: string;
}

export function useAdminBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        slot:time_slots(
          id,
          date,
          time,
          time_zone,
          is_available,
          closer_id,
          closer:profiles(id, full_name, email)
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("useAdminBookings – Supabase error:", error);
    }

    if (!error && data) {
      setBookings(
        data.map((b: any) => {
          let closer_name = "-";
          let closer_email = "-";
          let closer_id = b?.slot?.closer_id || "-";
          if (b.slot?.closer) {
            closer_name = b.slot.closer.full_name || "No closer name in profile";
            closer_email = b.slot.closer.email || "No closer email in profile";
          } else if (closer_id && closer_id !== "-") {
            closer_name = "[Missing closer profile]";
            closer_email = "[Missing closer profile]";
          } else {
            closer_name = "No closer assigned";
            closer_email = "No closer assigned";
          }
          if (!b.slot?.closer && process.env.NODE_ENV !== "production") {
            console.warn(
              `Booking ${b.id} (slot_id: ${b.slot_id}) has no closer profile linked. closer_id: ${closer_id}`
            );
          }
          return {
            id: b.id,
            slot_id: b.slot_id,
            slot_date: b.slot?.date || "-",
            slot_time: b.slot?.time || "-",
            slot_time_zone: b.slot?.time_zone || "UTC",
            is_available: b.slot?.is_available ?? false,
            first_name: b.first_name,
            last_name: b.last_name,
            email: b.email,
            phone: b.phone,
            call_status: b.call_status,
            deal_status: b.deal_status,
            closed_date: b.closed_date ?? "",
            follow_up_call_date: b.follow_up_call_date ?? "",
            reschedule_date: b.reschedule_date ?? "",
            payment_link_sent: b.payment_link_sent ?? "",
            contract_link_sent: b.contract_link_sent ?? "",
            invoice_sent: b.invoice_sent ?? "",
            invoice_sent_date: b.invoice_sent_date ?? "",
            contract_sent: b.contract_sent ?? "",
            contract_sent_date: b.contract_sent_date ?? "",
            offer_made: b.offer_made ?? "",
            ad_spend: b.ad_spend ?? "",
            country_area: b.country_area ?? "",
            zip_code: b.zip_code ?? "",
            recording_link: b.recording_link ?? "",
            note: b.note ?? "",
            additional_info: b.additional_info ?? "",
            created_at: b.created_at,
            closer_id,
            closer_name,
            closer_email,
          };
        })
      );
    } else {
      setBookings([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, isLoading, refresh: fetchBookings };
}
