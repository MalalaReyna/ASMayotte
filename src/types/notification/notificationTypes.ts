export type NotificationKind = "message" | "success" | "warning" | "file";

export type NotificationGroup = "today" | "yesterday" | "lastWeek";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  kind: NotificationKind;
  group: NotificationGroup;
  isRead: boolean;
};
