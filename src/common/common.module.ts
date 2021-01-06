import { forwardRef, Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Module({
  //imports: [forwardRef(() => CatsModule)],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
