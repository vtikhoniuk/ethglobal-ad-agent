import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  campaignName: string = '';

  @Column()
  websiteLink: string = '';

  @Column('text')
  description: string = '';

  @Column('simple-array')
  documents: string[] = [];

  @Column('text', { nullable: true })
  generatedText: string = '';

  @Column('int', { nullable: true })
  estimatedReach: number = 0;

  @Column('text', { nullable: true })
  userId: string = '';
}