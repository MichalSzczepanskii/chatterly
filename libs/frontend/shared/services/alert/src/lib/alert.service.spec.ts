import { TestBed } from '@angular/core/testing';

import { AlertMessage, AlertService } from './alert.service';
import { MockProvider } from 'ng-mocks';
import { MessageService } from 'primeng/api';
import { getTranslocoModule } from '@chatterly/frontend/shared/spec-utils';
import { TranslocoService } from '@ngneat/transloco';

describe('AlertService', () => {
  let service: AlertService;
  let translocoService: TranslocoService;
  let msgService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      providers: [MockProvider(MessageService)],
    });
    service = TestBed.inject(AlertService);
    translocoService = TestBed.inject(TranslocoService);
    msgService = TestBed.inject(MessageService);
  });

  it('should show error message with default title', () => {
    jest.spyOn(translocoService, 'translate').mockReturnValue('error');
    jest.spyOn(msgService, 'add');
    const error: AlertMessage = {
      message: 'error.message',
    };
    service.showError(error);
    expect(translocoService.translate).not.toHaveBeenCalledWith(error.title);
    expect(translocoService.translate).toHaveBeenCalledWith(error.message);
    expect(msgService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' })
    );
  });

  it('should show error message with title', () => {
    jest.spyOn(translocoService, 'translate').mockReturnValue('error');
    jest.spyOn(msgService, 'add');
    const error: AlertMessage = {
      title: 'error',
      message: 'error.message',
    };
    service.showError(error);
    expect(translocoService.translate).toHaveBeenCalledWith(error.title);
    expect(translocoService.translate).toHaveBeenCalledWith(error.message);
    expect(msgService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' })
    );
  });

  it('should show success message with default title', () => {
    jest.spyOn(translocoService, 'translate').mockReturnValue('success');
    jest.spyOn(msgService, 'add');
    const success: AlertMessage = {
      message: 'success.message',
    };
    service.showSuccess(success);
    expect(translocoService.translate).not.toHaveBeenCalledWith(success.title);
    expect(translocoService.translate).toHaveBeenCalledWith(success.message);
    expect(msgService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' })
    );
  });

  it('should show success message with title', () => {
    jest.spyOn(translocoService, 'translate').mockReturnValue('success');
    jest.spyOn(msgService, 'add');
    const success: AlertMessage = {
      title: 'success',
      message: 'success.message',
    };
    service.showSuccess(success);
    expect(translocoService.translate).toHaveBeenCalledWith(success.title);
    expect(translocoService.translate).toHaveBeenCalledWith(success.message);
    expect(msgService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' })
    );
  });
});
