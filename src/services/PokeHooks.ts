import { useMutation, useQuery } from "react-query";

// const queryClient = getQueryClient();

// // https://tkdodo.eu/blog/practical-react-query
// export const EventsHooks = {
//     useEventsQuery: () =>
//         useQuery(["eventsList"], EventsService.GetEventsViaAxios),
//     AddEventsQuery: async (newEvent: Event) =>
//         useQuery(["addEvent", newEvent], await EventsService.CreateEventViaAxios(newEvent)),
//     useEventUpdateMutation: (id: number) =>
//         useMutation(
//             async (e: Event) => {
//                 //await EventsService.UpdateEvent(e);
//             },
//             {
//                 onSuccess: () => {
//                     queryClient.invalidateQueries(["addEvent"]);
//                     queryClient.invalidateQueries(["eventsList"]);
//                 },
//             }
//         ),
// };