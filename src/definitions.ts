export interface UnityadsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
