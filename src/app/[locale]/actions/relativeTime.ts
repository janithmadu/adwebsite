import moment from 'moment';

export function getRelativeTime(timestamp:string) {
  return moment(timestamp).fromNow();
}
